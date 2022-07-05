from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

class UserAdmin(BaseUserAdmin):
    list_display=['id', 'username']
    list_filter=['id', 'username']

admin.site.register(User, UserAdmin)