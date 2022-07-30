# Generated by Django 4.0.5 on 2022-07-27 23:24

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='image',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.CreateModel(
            name='Reply',
            fields=[
                ('id', models.UUIDField(primary_key=True, serialize=False)),
                ('image', models.CharField(blank=True, max_length=255)),
                ('body', models.CharField(max_length=200)),
                ('time', models.DateTimeField()),
                ('likes', django.contrib.postgres.fields.ArrayField(base_field=models.UUIDField(), blank=True, size=None)),
                ('origin', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.post')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
