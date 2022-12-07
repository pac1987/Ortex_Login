import React, { Component } from 'react'

export default class Reset extends Component {
    render() {
        return (
            <form>
                <h3>Reset password</h3>
                <div className="mb-3">

                </div>
                <div className="mb-3">

                </div>
                <div className="mb-3">
                    <label>Email Address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                </div>
                <div className="mb-3">

                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>
                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        )
    }
}