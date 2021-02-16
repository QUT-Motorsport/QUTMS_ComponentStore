import React from 'react'
import { useLoading, Puff } from '@agney/react-loading'

// This is a loading component rendered when props.load passed to loading state is true, else its does not load
export default function Loading(props) {
    const { containerProps, indicatorEl } = useLoading({
        loading: props.load,
        indicator: <Puff width="25%" color="orange" />,
        loaderProps: {
            valueText: 'Fetching data ...',
        },
    });
    return (
        <>
            <div className="loading-background"></div>
            <section className="loading-container" {...containerProps}>
                {indicatorEl}
            </section>
        </>
    );
}