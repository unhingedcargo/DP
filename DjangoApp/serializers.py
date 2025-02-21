from rest_framework import serializers

from models import *

class CustomerSerializers(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'