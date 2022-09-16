# Generated by Django 4.0.5 on 2022-07-27 23:30

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_post_image_reply'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='replies',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.UUIDField(), blank=True, default=list, size=None),
            preserve_default=False,
        ),
    ]