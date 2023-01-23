from django_filters import FilterSet, filters

from farm_base.api.v1.filters.fields import NumberInFilter
from farm_base.models import Farm, Owner


class FarmFilter(FilterSet):
    ids = NumberInFilter(field_name='id', lookup_expr='in')
    filters.CharFilter(field_name='owner__name', lookup_expr='in')
    filters.CharFilter(field_name='owner__document', lookup_expr='in')
    filters.CharFilter(field_name='owner__document_type', lookup_expr='in')

    class Meta:
        model = Farm
        fields = ['ids', 'name', 'municipality','state','owner__name','owner__document','owner__document_type']
