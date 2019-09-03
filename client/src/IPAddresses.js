import React, { Component } from 'react';
import axios from 'axios'

class IPAddresses extends Component {
    state = {
        ip_addresses: null
    };

    componentDidMount() {
        this.fetchIPs();
    }

    fetchIPs = async () => {
        await axios
            .get("http://localhost:5000/fetch_ips")

            .then(response => {
                let all_ips = response.data
                console.log("all_ips = " + all_ips);

                this.setState({
                    ip_addresses: all_ips
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
