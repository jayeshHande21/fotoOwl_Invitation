from datetime import datetime

from pydantic import BaseModel, Field


class ExtraDetailCreate(BaseModel):
    label: str = Field(min_length=1, max_length=120)
    value: str = Field(min_length=1)


class ExtraDetailOut(BaseModel):
    id: int
    label: str
    value: str

    model_config = {"from_attributes": True}


class InvitationCreate(BaseModel):
    couple_names: str = Field(min_length=1, max_length=255)
    wedding_date: str = Field(min_length=1, max_length=120)
    location: str = Field(min_length=1, max_length=255)
    template_id: str = Field(default="classic", max_length=40)
    venue_details: str | None = None
    video_url: str | None = None
    message: str | None = None
    slug: str | None = Field(default=None, max_length=120)
    extra_details: list[ExtraDetailCreate] = Field(default_factory=list)


class InvitationUpdate(BaseModel):
    couple_names: str | None = Field(default=None, min_length=1, max_length=255)
    wedding_date: str | None = Field(default=None, min_length=1, max_length=120)
    location: str | None = Field(default=None, min_length=1, max_length=255)
    template_id: str | None = Field(default=None, max_length=40)
    venue_details: str | None = None
    video_url: str | None = None
    message: str | None = None


class InvitationOut(BaseModel):
    id: int
    slug: str
    template_id: str
    couple_names: str
    wedding_date: str
    location: str
    venue_details: str | None
    video_url: str | None
    message: str | None
    extra_details: list[ExtraDetailOut] = Field(default_factory=list)
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}
