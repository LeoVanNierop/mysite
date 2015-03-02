# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sky_alchemy', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='effect',
            options={'ordering': ['name']},
        ),
        migrations.AlterModelOptions(
            name='ingredient',
            options={'ordering': ['name']},
        ),
    ]
