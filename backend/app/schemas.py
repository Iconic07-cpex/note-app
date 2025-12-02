from pydantic import BaseModel, field_validator
from datetime import datetime
from typing import Optional

class NoteBase(BaseModel):
    title: str
    content: str
    
    @field_validator('title')
    @classmethod
    def validate_title(cls, v: str) -> str:
        # Trim whitespace
        v = v.strip()
        
        # Check if empty after trimming
        if not v:
            raise ValueError('Title is required.')
        
        # Check minimum length
        if len(v) < 3:
            raise ValueError('Title must be at least 3 characters.')
        
        # Check maximum length
        if len(v) > 150:
            raise ValueError('Title must not exceed 150 characters.')
        
        return v
    
    @field_validator('content')
    @classmethod
    def validate_content(cls, v: str) -> str:
        # Check if empty
        if not v:
            raise ValueError('Content is required.')
        
        # Check minimum length
        if len(v) < 10:
            raise ValueError('Content must be at least 10 characters.')
        
        # Check maximum length
        if len(v) > 10000:
            raise ValueError('Content must not exceed 10,000 characters.')
        
        return v

class NoteCreate(NoteBase):
    pass

class NoteUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    
    @field_validator('title')
    @classmethod
    def validate_title(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        
        # Trim whitespace
        v = v.strip()
        
        # Check if empty after trimming
        if not v:
            raise ValueError('Title is required.')
        
        # Check minimum length
        if len(v) < 3:
            raise ValueError('Title must be at least 3 characters.')
        
        # Check maximum length
        if len(v) > 150:
            raise ValueError('Title must not exceed 150 characters.')
        
        return v
    
    @field_validator('content')
    @classmethod
    def validate_content(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        
        # Check if empty
        if not v:
            raise ValueError('Content is required.')
        
        # Check minimum length
        if len(v) < 10:
            raise ValueError('Content must be at least 10 characters.')
        
        # Check maximum length
        if len(v) > 10000:
            raise ValueError('Content must not exceed 10,000 characters.')
        
        return v

class Note(NoteBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
