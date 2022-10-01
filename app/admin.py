from django.contrib import admin
from .models import User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

# here a custom UserAdmin class is created to specify custom
# fields to display and filter users by in the django admin
# panel (which is most likely not being used, hence all the customization),
# otherwise an error occurs since the default fields aren't
# available to be displayed/filtered.
class UserAdmin(BaseUserAdmin):
    list_display=['id', 'username']
    list_filter=['id', 'username']

# finally, the custom authorization user is registered:
admin.site.register(User, UserAdmin)