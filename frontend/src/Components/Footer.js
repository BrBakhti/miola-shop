import React from 'react';

class Footer extends React.Component {
    render() {
        let fullYear = new Date().getFullYear();
        return (
            <nav className="footer-custom">
                <div style={{textAlign: 'center', width: '100%'}}>
                    <span className="footer-text">
                        {fullYear}-{fullYear + 1} All Rights Reserved by
                        <span className="footer-brand"> Master MIOLA</span>
                    </span>
                </div>
            </nav>
        );
    }
}
export default Footer;
