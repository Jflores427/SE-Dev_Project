# Generated by Django 5.0.2 on 2024-04-23 20:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('prof', '0003_alter_profile_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]
