# Generated by Django 4.0.5 on 2022-08-30 21:27

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0008_remove_notification_target_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='notification',
            name='time',
            field=models.DateTimeField(default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]