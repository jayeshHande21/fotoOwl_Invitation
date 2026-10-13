import re
import secrets

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models.invitation import ExtraDetail, Invitation
from app.schemas.invitation import (
    ExtraDetailCreate,
    ExtraDetailOut,
    InvitationCreate,
    InvitationOut,
    InvitationUpdate,
)

router = APIRouter(prefix="/api/invitations", tags=["invitations"])


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")
    return slug or "invitation"


def unique_slug(db: Session, base: str) -> str:
    candidate = slugify(base)
    if not db.query(Invitation).filter(Invitation.slug == candidate).first():
        return candidate
    return f"{candidate}-{secrets.token_hex(3)}"


@router.get("", response_model=list[InvitationOut])
def list_invitations(db: Session = Depends(get_db)):
    return (
        db.query(Invitation)
        .options(joinedload(Invitation.extra_details))
        .order_by(Invitation.created_at.desc())
        .all()
    )


@router.post("", response_model=InvitationOut, status_code=status.HTTP_201_CREATED)
def create_invitation(payload: InvitationCreate, db: Session = Depends(get_db)):
    base_slug = payload.slug or payload.couple_names
    slug = unique_slug(db, base_slug)

    invitation = Invitation(
        slug=slug,
        couple_names=payload.couple_names.strip(),
        wedding_date=payload.wedding_date.strip(),
        location=payload.location.strip(),
        venue_details=payload.venue_details.strip() if payload.venue_details else None,
        video_url=payload.video_url.strip() if payload.video_url else None,
        message=payload.message.strip() if payload.message else None,
    )
    db.add(invitation)
    db.flush()

    for detail in payload.extra_details:
        db.add(
            ExtraDetail(
                invitation_id=invitation.id,
                label=detail.label.strip(),
                value=detail.value.strip(),
            )
        )

    db.commit()
    db.refresh(invitation)
    return (
        db.query(Invitation)
        .options(joinedload(Invitation.extra_details))
        .filter(Invitation.id == invitation.id)
        .one()
    )


@router.get("/{slug}", response_model=InvitationOut)
def get_invitation(slug: str, db: Session = Depends(get_db)):
    invitation = (
        db.query(Invitation)
        .options(joinedload(Invitation.extra_details))
        .filter(Invitation.slug == slug)
        .first()
    )
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")
    return invitation


@router.put("/{slug}", response_model=InvitationOut)
def update_invitation(
    slug: str, payload: InvitationUpdate, db: Session = Depends(get_db)
):
    invitation = (
        db.query(Invitation)
        .options(joinedload(Invitation.extra_details))
        .filter(Invitation.slug == slug)
        .first()
    )
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    data = payload.model_dump(exclude_unset=True)
    for key, value in data.items():
        if isinstance(value, str):
            value = value.strip() or None
        setattr(invitation, key, value)

    db.commit()
    db.refresh(invitation)
    return invitation


@router.post(
    "/{slug}/details",
    response_model=ExtraDetailOut,
    status_code=status.HTTP_201_CREATED,
)
def add_extra_detail(
    slug: str, payload: ExtraDetailCreate, db: Session = Depends(get_db)
):
    invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    detail = ExtraDetail(
        invitation_id=invitation.id,
        label=payload.label.strip(),
        value=payload.value.strip(),
    )
    db.add(detail)
    db.commit()
    db.refresh(detail)
    return detail


@router.delete("/{slug}/details/{detail_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_extra_detail(slug: str, detail_id: int, db: Session = Depends(get_db)):
    invitation = db.query(Invitation).filter(Invitation.slug == slug).first()
    if not invitation:
        raise HTTPException(status_code=404, detail="Invitation not found")

    detail = (
        db.query(ExtraDetail)
        .filter(ExtraDetail.id == detail_id, ExtraDetail.invitation_id == invitation.id)
        .first()
    )
    if not detail:
        raise HTTPException(status_code=404, detail="Detail not found")

    db.delete(detail)
    db.commit()
