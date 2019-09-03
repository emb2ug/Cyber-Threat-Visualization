import React, { Component } from 'react';
import axios from 'axios'

class IPAddresses extends Component {
    state = {
        ip_addresses: []
    };

    componentDidMount() {
        this.fetchIPs();
    }

    fetchIPs = async () => {

        await axios
            .get("https://cors-anywhere.herokuapp.com/api.cybercure.ai/feed/get_ips")

            .then(response => {
                //let first_ip = response.data.data.ip[0];
                let all_ips = response.data.data.ip;
                console.log("all_ips = " + all_ips);

                this.setState({
                    ip_addresses: all_ips
                })
            });
    };

    render() {
        return (
            <div>
                {this.state.ip_addresses.length > 0 ? <p>First IP: {this.state.ip_addresses[0]}</p> : <div/>}
            </div>
        );
    }
}

export default IPAddresses;
