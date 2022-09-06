import { ErrorBoundaryIcon, LogoIcon } from "assets/images";
import { Button } from "components/Button";
import Link from "next/link";
import React from "react";
import styles from "./error-boundary.module.css";

class ErrorBoundary extends React.Component {
  constructor(props: { [key: string]: any }) {
    super(props);
    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    if (process.env.NODE_ENV === "production") {
      // You can use your own error logging service here
      console.log({ error, errorInfo });
    }
  }

  goToHome = () => {
    this.setState({ hasError: false });
    window.location.replace("/");
  };

  render() {
    // Check if the error is thrown
    if ((this.state as { [key: string]: any }).hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <header className="bg-color">
            <nav className="px-14 py-5">
              <div className="inline-flex">
                <button onClick={() => this.setState({ hasError: false })}>
                  <a className={` cursor-pointer `}>
                    <LogoIcon />
                  </a>
                </button>
              </div>
            </nav>
          </header>
          <div className={`${styles["container"]}`}>
            <section className="py-10 mt-12">
              <div className="pb-7 flex justify-center">
                <ErrorBoundaryIcon />
              </div>
              <h2 className="text-2xl font-bold text-center pb-1">
                {`Oops!, Something went wrong.`}
              </h2>
              <p className="text-center app-text-grey text-sm">
                {`Something happened, but don't worry our developers are working to fix it as soon as possible.`}
              </p>
              <Button
                onClick={this.goToHome}
                className="mt-8 mx-auto"
                secondary
              >
                Reload page
              </Button>
            </section>
          </div>
        </>
      );
    }

    // Return children components in case of no error

    return (this.props as { [key: string]: any }).children;
  }
}

export { ErrorBoundary };
