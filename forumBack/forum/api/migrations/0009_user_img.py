# Generated by Django 4.2.8 on 2023-12-26 13:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_alter_comment_reply'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='img',
            field=models.ImageField(blank=True, upload_to='img/'),
        ),
    ]
