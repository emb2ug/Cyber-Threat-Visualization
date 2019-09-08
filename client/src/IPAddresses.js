import React, { Component } from 'react';
import axios from 'axios'
import VisualizationMap from "./VisualizationMap";

const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class IPAddresses extends Component {
    state = {
        ip_addresses: [],
        location_data: [],
        lats_and_longs: []
    };

    componentDidMount() {
        // this.fetchDataForIPs();
        console.log(REACT_APP_GOOGLE_MAPS_API_KEY)

    }

    fetchDataForIPs = async () => {
        let all_ips = null
        let all_location_data = null
        let all_lats_and_longs = null
        await axios
            .get("http://localhost:5000/fetch_ips")

            .then(response => {
                all_ips = response.data
                console.log("all_ips = " + all_ips);

                all_location_data = []
                all_lats_and_longs = []
                all_ips.map(ip => {
                    axios
                        .get("http://localhost:5000/fetch_data_by_ip_old/" + ip)
                        .then(response => {
                            console.log(response.data)
                            all_location_data.push(response.data)

                            let temp_lat = response.data.latitude
                            let temp_long = response.data.longitude

                            let temp_lat_and_long = {
                                latitude: temp_lat,
                                longitude: temp_long
                            }

                            all_lats_and_longs.push(temp_lat_and_long)

                            this.setState({
                                ip_addresses: all_ips,
                                location_data: all_location_data,
                                lats_and_longs: all_lats_and_longs
                            })



                        })
                        .catch()
                         return ""

                })
            })
    }

    render() {
        return (
            <div>

                <button onClick={this.fetchDataForIPs}>Populate Map</button>


                <div>
                    {this.state.ip_addresses.length > 0 ? <p>First IP: {this.state.ip_addresses[0]}</p> : <div/>}
                    {this.state.location_data.length > 0 ?
                        <p>
                            First Lat/Long: {this.state.location_data[0].latitude + ", " +
                            this.state.location_data[0].longitude}
                        </p>
                        : <div/>}
                </div>

                <div>
                    {this.state.lats_and_longs.length > 0 ?
                        <VisualizationMap location_data={this.state.lats_and_longs}/> : <div/>}
                </div>
            </div>

        );
    }
}

export default IPAddresses;


// call fetchIPs to get list of all 100 IP addresses
// in .then of that axios call, map over IPs and hit backend again using fetch_data_by_ip endpoint
