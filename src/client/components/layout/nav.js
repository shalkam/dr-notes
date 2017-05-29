import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default class nav extends React.Component {
  constructor(...args) {
    super(...args);
    // this.state = {
    //   users: this.props.router.isActive('/admin/user') ||
    //     this.props.router.isActive('/admin/role') ||
    //     this.props.router.isActive('/admin/roleMappings'),
    //   cars: this.props.router.isActive('/admin/used-car') ||
    //     this.props.router.isActive('/admin/new-car') ||
    //     this.props.router.isActive('/admin/checked-car')
    // };
  }

  render() {
    return (
      <div>
        <a href="/"><strong><i className="glyphicon glyphicon-eye-open" /> View Website</strong></a>
        <hr />
        <Link to="/admin">
          <strong><i className="glyphicon glyphicon-wrench" /> Administration</strong>
        </Link>
        <hr />
        <ul className="nav nav-stacked">
          <li className="nav-header">
            <Link to="/admin/config">
              <i className="glyphicon glyphicon-flag" /> اعدادات الموقع
            </Link>
          </li>
          <li className="nav-header">
            <a style={{ cursor: 'pointer' }}>
              ادارة المستخدمين{' '}
            </a>
            <hr />
            <ul className="nav nav-stacked">
              <li>
                <Link to="/admin/user">
                  <i className="glyphicon glyphicon-user" /> المستخدمين
                </Link>
              </li>
              <li>
                <Link to="/admin/role">
                  <i className="glyphicon glyphicon-flag" /> الادوار
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-header">
            <a style={{ cursor: 'pointer' }}>
              ادارة السيارات{' '}
            </a>
            <hr />
            <ul className="nav nav-stacked">
              <li>
                <Link to="/admin/new-car">
                  <i className="glyphicon glyphicon-user" /> السيارات الجديدة
                </Link>
              </li>
              <li>
                <Link to="/admin/used-car">
                  <i className="glyphicon glyphicon-flag" /> السيارات المستعملة
                </Link>
              </li>
              <li>
                <Link to="/admin/checked-car">
                  <i className="glyphicon glyphicon-cog" /> السيارات المفحوصة
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }
}

// export default withRouter(nav);
