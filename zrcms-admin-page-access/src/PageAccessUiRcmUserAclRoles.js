import React, {Component} from 'react'
import PropTypes from 'prop-types'

class PageAccessUiRcmUserAclRoles extends Component {
    constructor(props) {
        super(props);

        this.indentString = '-';
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleRoleClick = this.handleRoleClick.bind(this);
        this.clearSearch = this.clearSearch.bind(this);

        this.state = {
            searchQuery: '',
        };
    }

    handleSearchChange(event) {
        this.setState({searchQuery: event.target.value});
    }

    handleRoleClick(event) {
        this.toggleSelected(event.currentTarget.getAttribute('data-role'));
    }

    buildIndentString(namespace, namespaceDelimiter = '.') {
        namespace = '' + namespace;

        let n = (namespace.split(namespaceDelimiter).length - 1);
        let a = [];
        while (a.length < n) {
            a.push(this.indentString);
        }
        return a.join('');
    }

    compareStrings(stringA, stringB) {
        stringA = ("" + stringA).toLowerCase();
        stringB = ("" + stringB).toLowerCase();

        return stringA.indexOf(stringB) !== -1;
    };

    toggleSelected(role) {
        if (!this.props.allowedRoles) {
            console.error('allowedRoles is undefined or null');
            return;
        }

        if (!this.props.allowedRoles.has(role)) {
            this.props.allowedRoles.add(role);
        } else {
            this.props.allowedRoles.remove(role);
        }

        this.onAllowedRolesChange();

        this.forceUpdate();
    }

    onAllowedRolesChange() {
        if (typeof this.props.onAllowedRolesChange === 'function') {
            this.props.onAllowedRolesChange(this.props.allowedRoles.get());
        }
    }

    hasRolesSelected() {
        return (this.props.allowedRoles.hasAny());
    }

    isRoleSelected(role) {
        return (this.props.allowedRoles.has(role));
    }

    clearSearch() {
        this.setState({searchQuery: ''})
    }

    search() {
        if (!this.state.searchQuery || this.state.searchQuery === '') {
            return this.props.rcmUserAclRoles
        }

        let result = {};
        let key, roleObject;
        for (key in this.props.rcmUserAclRoles) {
            roleObject = this.props.rcmUserAclRoles[key];

            if (this.compareStrings(roleObject.roleId, this.state.searchQuery)) {
                result[key] = roleObject;
            }
        }

        return result
    }

    renderSelectedIcon(roleId) {
        // If no roles selected then it implies all are selected
        if (!this.hasRolesSelected()) {
            return (
                <span className="glyphicon glyphicon-ok"
                      style={{
                          display: 'inline-block',
                          color: '#dddddd'
                      }}
                      aria-hidden="true"
                />
            );
        }

        if (this.isRoleSelected(roleId)) {
            return (
                <span className="glyphicon glyphicon-ok"
                      style={{
                          display: 'inline-block',
                          color: 'green'
                      }}
                      aria-hidden="true"
                />
            );
        }

        return (
            <span className="glyphicon glyphicon-remove"
                  style={{
                      display: 'inline-block',
                      color: '#dddddd'
                  }}
                  aria-hidden="true"
            />
        );
    }

    renderRoleList() {
        let key, roleObject;
        let rcmUserAclRoles = this.search();
        let roleList = [];

        for (key in rcmUserAclRoles) {
            roleObject = rcmUserAclRoles[key];
            roleList.push(
                <li key={key.toString()}>
                    <a className="btn btn-xs"
                       onClick={this.handleRoleClick}
                       data-role={roleObject.roleId}
                    >
                        <div className={"item" + this.isRoleSelected(roleObject.roleId) ? ' selected' : ''}>
                            {this.renderSelectedIcon(roleObject.roleId)}
                            &nbsp;&nbsp;
                            <span>{this.buildIndentString(roleObject.namespace) + ' ' + roleObject.roleId}</span>
                        </div>
                    </a>
                </li>
            )
        }

        return (
            <ul className="list-unstyled">
                {roleList}
            </ul>
        );
    }

    renderSearch() {
        if (!this.props.showSearch) {
            return null;
        }

        return (
            <div className="form-group search">
                <form className="form-inline">
                    <div className="input-group">
                        <input className="form-control input-sm"
                               type="text"
                               placeholder={this.props.searchPlaceholder}
                               onChange={this.handleSearchChange}
                               value={this.state.searchQuery}
                        />
                        <span className="input-group-btn">
                            <button className="btn btn-default btn-sm"
                                    onClick={this.clearSearch}
                                    type="button">x
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        );
    }

    render() {
        let self = this;
        return (
            <div className={"panel panel-default role-selector" + this.props.loading ? " loading" : ''}>
                <div className="panel-body">
                    {self.renderSearch()}
                    <hr/>
                    <div className="">
                        {self.renderRoleList()}
                    </div>
                    <hr/>
                    <div className="save"
                         style={{display: (typeof this.props.handleSave === 'function') ? 'block' : 'none'}}
                    >
                        <button className="btn btn-default" onClick={this.props.handleSave} type="button">
                            {this.props.saveLabel}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

PageAccessUiRcmUserAclRoles.defaultProps = {
    saveLabel: 'Save',
    showSearch: true,
    searchPlaceholder: 'Search',
    allowedRoles: null,
    rcmUserAclRoles: {},
};

PageAccessUiRcmUserAclRoles.propTypes = {
    handleSave: PropTypes.func,
    loading: PropTypes.bool,
    saveLabel: PropTypes.string,
    searchPlaceholder: PropTypes.string,
    showSearch: PropTypes.bool,
    allowedRoles: PropTypes.object, // {AllowedRoles}
    rcmUserAclRoles: PropTypes.object,
    onAllowedRolesChange: PropTypes.func,
};


export default PageAccessUiRcmUserAclRoles;
