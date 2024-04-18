import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import { Transition } from '@headlessui/react'
import { DataContext, ContextProvider } from './context'

import LaunchContainer from './containers/launch'
import MainContainer from './containers/main'
import SettingsContainer from './containers/settings'
import ModalsContainer from './containers/modals'

import './main.css'

function CustomTransition ({ show, children }) {
    return (
        <Transition
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            show={show}
        >
            {children}
        </Transition>
    )
}

class Index extends Component {
    static contextType = DataContext

    render () {
        return (
            <>
                <CustomTransition show={this.context.data.window === 'launch'}>
                    <LaunchContainer />
                </CustomTransition>
                <CustomTransition show={this.context.data.window === 'main'}>
                    <MainContainer />
                </CustomTransition>
                <CustomTransition show={this.context.data.window === 'settings'}>
                    <SettingsContainer />
                </CustomTransition>
                <ModalsContainer />
            </>
        )
    }
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <Index />
    </ContextProvider>
)