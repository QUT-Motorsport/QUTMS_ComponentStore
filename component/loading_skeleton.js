import React from 'react'
import ContentLoader from 'react-content-loader'

// This is a loading component with layout skeleton animation 
export default function ReactContentLoader() {
    return (
        <div>
            <div className="container">
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-2">Photo</div>
                        <div className="col col-1">Name&nbsp;</div>
                        <div className="col col-3">Quantity&nbsp;</div>
                        <div className="col col-4">Location&nbsp;</div>
                    </li>
                    <li className="table-row">
                        <div className="col col-2">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="200" height="150" />
                            </ContentLoader>
                        </div>
                        <div className="col col-1">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="400" height="35" />
                            </ContentLoader>
                        </div>
                        <div className="col col-3">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="200" height="35" />
                            </ContentLoader>
                        </div>
                        <div className="col col-4">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="150" height="35" />
                            </ContentLoader>
                        </div>
                    </li>
                    <li className="table-row">
                        <div className="col col-2">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="200" height="150" />
                            </ContentLoader>
                        </div>
                        <div className="col col-1">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="400" height="35" />
                            </ContentLoader>
                        </div>
                        <div className="col col-3">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="200" height="35" />
                            </ContentLoader>
                        </div>
                        <div className="col col-4">
                            <ContentLoader>
                                <rect x="0" y="0" rx="5" ry="5" width="150" height="35" />
                            </ContentLoader>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}