import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Delivery } from '../interfaces';

export default function DeliveryContainer(delivery: Delivery) {
    return(
        <View>
            <Text>{delivery.description} - {delivery._id}</Text>
        </View>
    )
}