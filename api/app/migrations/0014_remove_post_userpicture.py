# Generated by Django 4.0.5 on 2022-09-16 03:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_post_userpicture'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='post',
            name='userPicture',
        ),
    ]
