# Generated by Django 2.2 on 2023-01-21 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('farm_base', '0004_farm_owner'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='farm',
            constraint=models.CheckConstraint(check=models.Q(owner__isnull=False), name='owner_isnull'),
        ),
        migrations.AddConstraint(
            model_name='farm',
            constraint=models.CheckConstraint(check=models.Q(municipality__isnull=False), name='municipality_isnull'),
        ),
        migrations.AddConstraint(
            model_name='farm',
            constraint=models.CheckConstraint(check=models.Q(state__isnull=False), name='state_isnull'),
        ),
        migrations.AddConstraint(
            model_name='farm',
            constraint=models.CheckConstraint(check=models.Q(name__isnull=False), name='name_isnull'),
        ),
    ]
