from django.contrib import admin
from .models import UserAccounts
from django.contrib.auth.admin import UserAdmin

class UserAccountAdminConfig(UserAdmin):
    
    ordering = ('email',)
    list_display = ('email', 'username', 'is_active', 'is_staff', 'is_superuser')
    
    fieldsets = ((None, {'fields': ('email', 'username', 'password')}),
				('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
				('PersonalInfo', {'fields': ('date_of_birth',)}),
		)
        
    add_fieldsets = (
			(None, {
				'classes': ('wide',),
				'fields': ('email', 'username', 'password', 'password2', 
					'date_of_birth', 'is_active', 'is_staff', 'is_superuser')
				}),
		)

admin.site.register(UserAccounts, UserAccountAdminConfig)
