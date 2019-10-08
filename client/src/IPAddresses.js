import React, { Component } from 'react';
import axios from 'axios'
import VisualizationMap from "./VisualizationMap";
import 'antd/dist/antd.css';
import { Checkbox } from 'antd';
import { Button } from 'antd';


const REACT_APP_GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

class IPAddresses extends Component {
    state = {
        ip_addresses: [],
        location_data: [],
        lats_and_longs: [],
        continents: [],
        selectedContinents: []
    };

    componentDidMount() {
        // this.fetchDataForIPs();
        console.log(REACT_APP_GOOGLE_MAPS_API_KEY)

    }

    fetchDataForIPs = async () => {
        let all_ips = null
        let all_location_data = null
        let all_lats_and_longs = null
        let all_unique_continents = null


        await axios
            .get("http://localhost:5000/fetch_ips")

            .then(response => {
                all_ips = response.data
                console.log("all_ips = " + all_ips);

                all_location_data = []
                all_lats_and_longs = []
                all_unique_continents = []
                all_ips.map(ip => {
                    axios
                        .get("http://localhost:5000/fetch_data_by_ip/" + ip)
                        .then(response => {
                            //console.log(response.data)
                            all_location_data.push(response.data)

                            let temp_lat = response.data.latitude
                            let temp_long = response.data.longitude
                            let continent_name = response.data.continent_name

                            if(!all_unique_continents.includes(continent_name)){
                                all_unique_continents.push(continent_name)
                            }


                            let temp_lat_and_long = {
                                latitude: temp_lat,
                                longitude: temp_long
                            }

                            all_lats_and_longs.push(temp_lat_and_long)

                            this.setState({
                                ip_addresses: all_ips,
                                location_data: all_location_data,
                                lats_and_longs: all_lats_and_longs,
                                continents: all_unique_continents,
                                selectedContinents: all_unique_continents
                            })



                        })
                        .catch()
                         return ""

                })
            })
    }

    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
        this.setState({
            selectedContinents :checkedValues
        })
    }

    render() {
        return (
            <div>


                <div>
                    {this.state.lats_and_longs.length === 0 ?
                    <Button type="primary" onClick={this.fetchDataForIPs}>Populate Map</Button> : <div/>}
                </div>


                <div>
                    {this.state.lats_and_longs.length > 0 ?
                        <p>Filter by Continent</p> : <div/>}
                </div>

                <div>
                    {this.state.lats_and_longs.length > 0 ?
                        <Checkbox.Group options={this.state.continents} defaultValue={this.state.continents} onChange={this.onChange} /> : <div/>}
                </div>



                <div>
                    <div>
                        {this.state.lats_and_longs.length > 0 ?
                            <VisualizationMap filter={this.state.selectedContinents} location_data={this.state.location_data}/> : <div/>}
                    </div>


                </div>
            </div>

        );
    }
}

export default IPAddresses;


// call fetchIPs to get list of all 100 IP addresses
// in .then of that axios call, map over IPs and hit backend again using fetch_data_by_ip endpoint
