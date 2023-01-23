from django.contrib.gis.db import models
from django.utils.translation import gettext as _
from django.db.models.constraints import CheckConstraint
from django.db.models import Q

class Farm(models.Model):
    name = models.CharField(verbose_name=_("Name"), max_length=255,
                            null=True, blank=True)

    municipality = models.CharField(verbose_name=_("Municipality"), max_length=255,
                            null=True, blank=True)
    
    state = models.CharField(verbose_name=_("State"), max_length=255,
                            null=True, blank=True)
    
    owner = models.ForeignKey("Owner", on_delete=models.SET_NULL,
                            null=True, blank=True)

    geometry = models.GeometryField(verbose_name=_("Geometry"),
                                    null=True, blank=True)

    area = models.FloatField(verbose_name=_("Area"),
                             blank=True, null=True)

    centroid = models.PointField(verbose_name=_("Centroid"),
                                 blank=True, null=True)

    creation_date = models.DateTimeField(verbose_name=_("Creation date"),
                                         auto_now_add=True, editable=False)

    last_modification_date = models.DateTimeField(
        verbose_name=_("Last modification date"), auto_now=True)

    is_active = models.BooleanField(verbose_name=_("Is Active"), default=True)

    def __str__(self):
        return str(self.name)

    class Meta:
        ordering = ['id']
        verbose_name = _('Farm')
        verbose_name_plural = _('Farms')
        constraints = [
            CheckConstraint(check=Q(owner__isnull=False), name='owner_isnull'),
            CheckConstraint(check=Q(municipality__isnull=False), name='municipality_isnull'),
            CheckConstraint(check=Q(state__isnull=False), name='state_isnull'),
            CheckConstraint(check=Q(name__isnull=False), name='name_isnull')
        ]
