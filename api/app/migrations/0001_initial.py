# Generated by Django 4.0.5 on 2022-07-05 03:51

from django.conf import settings
import django.contrib.auth.models
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('email', models.CharField(max_length=765)),
                ('username', models.CharField(blank=True, max_length=765, unique=True)),
                ('password', models.CharField(max_length=255)),
                ('picture', models.CharField(blank=True, max_length=255)),
                ('banner', models.CharField(blank=True, max_length=255)),
                ('bio', models.CharField(blank=True, max_length=200)),
                ('following', django.contrib.postgres.fields.ArrayField(base_field=models.UUIDField(), blank=True, size=None)),
                ('followers', django.contrib.postgres.fields.ArrayField(base_field=models.UUIDField(), blank=True, size=None)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('body', models.CharField(max_length=200)),
                ('time', models.DateTimeField()),
                ('likes', django.contrib.postgres.fields.ArrayField(base_field=models.UUIDField(), blank=True, size=None)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
