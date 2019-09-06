import React, { Component } from 'react';
import axios from 'axios'

class IPAddresses extends Component {
    state = {
        ip_addresses: [],
        location_data: [],
        done_loading_data: false
    };

    componentDidMount() {
        this.fetchDataForIPs();
    }

    afterDataLoaded = () => {
        console.log("entered after data loaded")
        this.setState({
            done_loading_data: true
        })
    }

    fetchDataForIPs = async () => {
        let all_ips = null
        let all_location_data = null
        await axios
            .get("http://localhost:5000/fetch_ips")

            .then(response => {
                all_ips = response.data
                console.log("all_ips = " + all_ips);

                all_location_data = []
                all_ips.map(ip => {
                    axios
                        .get("http://localhost:5000/fetch_data_by_ip/" + ip)
                        .then(response => {
                            console.log(response.data)
                            all_location_data.push(response.data)

                            this.setState({
                                ip_addresses: all_ips,
                                location_data: all_location_data
                            })

                        })
                        .catch()
                })
            })
    }

    render() {
        return (
            <div>
                {this.state.ip_addresses.length > 0 ? <p>First IP: {this.state.ip_addresses[0]}</p> : <div/>}
                {this.state.location_data.length > 0 ?
                    <p>
                        First Lat/Long: {this.state.location_data[0].latitude + ", " +
                        this.state.location_data[0].longitude}
                    </p>
                    : <div/>}
            </div>
        );
    }
}

export default IPAddresses;


// call fetchIPs to get list of all 100 IP addresses
// in .then of that axios call, map over IPs and hit backend again using fetch_data_by_ip endpoint
