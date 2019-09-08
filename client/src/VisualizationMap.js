import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';


const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const mapStyles = {
    width: '75%',
    height: '75%',
};

class VisualizationMap extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ip_addresses: [],
            location_data: [],
            done_loading_data: false
        };
    }
    componentDidMount() {
        console.log(REACT_APP_GOOGLE_MAPS_API_KEY)
    }


    render() {
        return (
            <Map
                google={this.props.google}
                zoom={8}
                style={mapStyles}
                initialCenter={{ lat: 47.444, lng: -122.176}}
            >
                <Marker position={{ lat: 48.00, lng: -122.00}} />

                {this.props.location_data.map(location => {
                    return <Marker position = {{ lat: location.latitude, lng: location.longitude }}/>
                })}

            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: REACT_APP_GOOGLE_MAPS_API_KEY
})(VisualizationMap);
