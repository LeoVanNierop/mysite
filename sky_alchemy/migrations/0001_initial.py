# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Effect',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('base_cost', models.FloatField()),
                ('base_magnitude', models.FloatField()),
                ('base_Duration', models.FloatField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='ingredient',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(unique=True, max_length=100)),
                ('cost', models.FloatField()),
                ('weight', models.FloatField()),
                ('effect1', models.ForeignKey(related_name='effect1', to='sky_alchemy.Effect')),
                ('effect2', models.ForeignKey(related_name='effect2', to='sky_alchemy.Effect')),
                ('effect3', models.ForeignKey(related_name='effect3', to='sky_alchemy.Effect')),
                ('effect4', models.ForeignKey(related_name='effect4', to='sky_alchemy.Effect')),
            ],
            options={
            },
            bases=(models.Model,),
        ),
    ]
