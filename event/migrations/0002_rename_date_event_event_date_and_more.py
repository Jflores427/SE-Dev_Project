# Generated by Django 5.0.2 on 2024-04-09 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='event',
            old_name='date',
            new_name='event_date',
        ),
        migrations.RenameField(
            model_name='event',
            old_name='time',
            new_name='event_time',
        ),
    ]