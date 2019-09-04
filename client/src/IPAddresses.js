import React, { Component } from 'react';
import axios from 'axios'

class IPAddresses extends Component {
    state = {
        ip_addresses: null,
        location_data: null
    };

    componentDidMount() {
        this.fetchDataForIPs();
    }

    fetchDataForIPs = async () => {
        await axios
            .get("http://localhost:5000/fetch_ips")

            .then(response => {
                let all_ips = response.data
                console.log("all_ips = " + all_ips);

                let all_location_data = []
                all_ips.map(ip => {
                    axios
                        .get("http://localhost:5000/fetch_data_by_ip/" + ip)
                        .then(response => {
                            console.log(response.data)
                            all_location_data.push(response.data)

                        })
                        .catch()
                })

                this.setState({
                    ip_addresses: all_ips,
                    location_data: all_location_data
                })
            });
    }

    render() {
        return (
            <div>
                {this.state.ip_addresses ? <p>First IP: {this.state.ip_addresses[0]}</p> : <div/>}
            </div>
        );
    }
}

export default IPAddresses;


// call fetchIPs to get list of all 100 IP addresses
// in .then of that axios call, map over IPs and hit backend again using fetch_data_by_ip endpoint
