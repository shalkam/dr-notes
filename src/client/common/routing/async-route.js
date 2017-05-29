import React from 'react';
import PubSub from 'pubsub-js';
export default function asyncRoute(getComponent) {
  return class AsyncComponent extends React.Component {
    static Component = null;
    mounted = false;

    state = {
      Component: AsyncComponent.Component
    };

    componentWillMount() {
      if (this.state.Component === null) {
        PubSub.publish('LOADING', true);
        // Load component synchronously if require is used
        if (typeof getComponent().then === 'undefined') {
          PubSub.publish('LOADING', false);
          AsyncComponent.Component = getComponent().default;
          this.setState({ Component: getComponent().default });
        } else {
          getComponent()
            .then(m => m.default)
            .then(Component => {
              AsyncComponent.Component = Component;
              PubSub.publish('LOADING', false);
              if (this.mounted) {
                this.setState({ Component });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      }
    }

    componentDidMount() {
      this.mounted = true;
      const { isServer } = this.context;
    }

    componentWillUnmount() {
      this.mounted = false;
    }

    render() {
      const { Component, loading } = this.state;
      if (Component !== null) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      }
      return null;
    }
  };
}
