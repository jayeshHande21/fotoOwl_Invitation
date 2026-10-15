from datetime import datetime

from sqlalchemy import DateTime, ForeignKey, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Invitation(Base):
    __tablename__ = "invitations"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    slug: Mapped[str] = mapped_column(String(120), unique=True, index=True)
    template_id: Mapped[str] = mapped_column(String(40), default="classic")
    couple_names: Mapped[str] = mapped_column(String(255))
    wedding_date: Mapped[str] = mapped_column(String(120))
    location: Mapped[str] = mapped_column(String(255))
    venue_details: Mapped[str | None] = mapped_column(Text, nullable=True)
    video_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    photos_url: Mapped[str | None] = mapped_column(String(500), nullable=True)
    message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now()
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )

    extra_details: Mapped[list["ExtraDetail"]] = relationship(
        back_populates="invitation",
        cascade="all, delete-orphan",
        order_by="ExtraDetail.id",
    )


class ExtraDetail(Base):
    __tablename__ = "extra_details"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    invitation_id: Mapped[int] = mapped_column(ForeignKey("invitations.id"))
    label: Mapped[str] = mapped_column(String(120))
    value: Mapped[str] = mapped_column(Text)

    invitation: Mapped["Invitation"] = relationship(back_populates="extra_details")
