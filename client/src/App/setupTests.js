import 'regenerator-runtime/runtime'
import '@testing-library/jest-dom';
import { shallow, render, mount, configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react'
import { createSerializer } from "enzyme-to-json";
import sinon from "sinon";
import toJSON from 'enzyme-to-json'
import { createStore, applyMiddleware } from 'redux'


// Set the default serializer for Jest to be the from enzyme-to-json
// This produces an easier to read (for humans) serialized format.
expect.addSnapshotSerializer(createSerializer({ mode: "deep" }));

configure({ adapter: new Adapter() })

const store = createStore(() => [], {}, applyMiddleware())

// Global variables:
global.React = React
global.shallow = shallow
global.render = render
global.mount = mount
global.sinon = sinon
global.toJSON = toJSON
global.store = store