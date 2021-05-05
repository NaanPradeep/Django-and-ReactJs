from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class UserAccountManager(BaseUserManager):
    
    def create_superuser(self, email, username, password, date_of_birth, **other_fields):
        
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        
        if other_fields.get('is_staff') is not True:
            raise ValueError('For superuser "is_staff"" must be true')
        if other_fields.get('is_superuser') is not True:
            raise ValueError('For superuser "is_superuser" must be true')
            
        user = self.create_user(
            email=email,
            username=username,
            password=password,
            date_of_birth=date_of_birth,
            **other_fields
        )
        
        return user
        
        
    def create_user(self, email, username, password, date_of_birth, **other_fields):
        
        if not email:
            raise ValueError('User must have an email address')
            
        other_fields.setdefault('is_staff', False)
        other_fields.setdefault('is_superuser', False)
        
        email = self.normalize_email(email)
        
        user = self.model(
				email=email,
				username=username,
				date_of_birth=date_of_birth,
				**other_fields
				)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
        
        
class UserAccounts(AbstractBaseUser, PermissionsMixin):
    email = models.CharField(max_length=100, unique=True)
    username = models.CharField(max_length=50, unique=True)
    date_of_birth = models.DateField()
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    objects = UserAccountManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'date_of_birth']
    
    def __str__(self):
        return self.email
        
    class Meta:
        verbose_name_plural = "UserAccounts"

