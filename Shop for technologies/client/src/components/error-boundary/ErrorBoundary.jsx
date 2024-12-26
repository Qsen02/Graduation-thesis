import { Component } from "react";

import styles from "./ErrorBoundary.module.css";

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError(err) {
        return { hasError: true, message: err.message };
    }

    render() {
        if (this.state.hasError) {
            this.state.hasError = false;
            return (
                    <div className={styles.wrapper}>
                        <h2>Възникна грешка!</h2>
                        <p>
                            Моля върнете се в <a href="/">НАЧАЛО</a>
                        </p>
                    </div>
            );
        }

        return this.props.children;
    }
}
