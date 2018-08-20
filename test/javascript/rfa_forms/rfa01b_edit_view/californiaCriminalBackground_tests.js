import React from 'react'
import CaliforniaCriminalBackground from 'rfa_forms/rfa01b_edit_view/californiaCriminalBackground'
import {shallow, mount} from 'enzyme'
import Validator from 'helpers/validator'

describe('Verify californiaCriminalBackground card', function () {
  let setStateSpy, setParentStateSpy, setDisplayStateSpy,
    componentMount, setFocusStateSpy, onHideClickSpy, componentMountWithoutDisclosures,
    getFocusClassNameSpy, addCardSpy, clickCloseSpy, onFieldChangeSpy, handleClearOnConditionalChangeSpy

  let disclosures = [{
    'offense': 'test',
    'offense_city': 'test',
    'offense_state': {},
    'when_offense_happen': 'test',
    'offense_details': 'test'
  }]

  let disclosureDefaults = [{
    'offense': '',
    'offense_city': '',
    'offense_state': {},
    'when_offense_happen': '',
    'offense_details': ''
  }]

  let validator = new Validator({})

  beforeEach(() => {
    setStateSpy = jasmine.createSpy('setState')
    setDisplayStateSpy = jasmine.createSpy('setDisplayState')
    getFocusClassNameSpy = jasmine.createSpy('getFocusClassName')
    setFocusStateSpy = jasmine.createSpy('setFocusState')
    addCardSpy = jasmine.createSpy('addCard')
    clickCloseSpy = jasmine.createSpy('clickClose')
    onFieldChangeSpy = jasmine.createSpy('onFieldChange')
    setParentStateSpy = jasmine.createSpy('setParentState')
    handleClearOnConditionalChangeSpy = jasmine.createSpy('handleClearOnConditionalChange')

    componentMount = mount(<CaliforniaCriminalBackground
      convictedInCalifornia={false}
      disclosures={disclosures}
      focusComponentName={'CACriminalBackgroundCard'}
      getFocusClassName={getFocusClassNameSpy}
      handleClearOnConditionalChange={handleClearOnConditionalChangeSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      validator={validator} />)

    componentMountWithoutDisclosures = mount(<CaliforniaCriminalBackground
      convictedInCalifornia
      disclosures={undefined}
      focusComponentName={'crimeBackgroundAgainstCohabitantCard'}
      getFocusClassName={getFocusClassNameSpy}
      handleClearOnConditionalChange={handleClearOnConditionalChangeSpy}
      setFocusState={setFocusStateSpy}
      setParentState={setParentStateSpy}
      validator={validator} />)
  })

  describe('Verify component will mount', () => {
    it('verify component did mount', () => {
      expect(componentMount.length).toEqual(1)
    })
    it('expects 4 validations', () => {
      expect(componentMount.instance().props.validator.validations.size).toEqual(4)
    })
    it('tests handleNavLinkClick', () => {
      let CACrimeDisclosureCard = componentMount.find('#CACriminalBackgroundCard').hostNodes()
      CACrimeDisclosureCard.simulate('click')
      expect(setFocusStateSpy).toHaveBeenCalledWith('CACriminalBackgroundCard')
    })
    it('adds a card', () => {
      spyOn(componentMount.instance(), 'addCard').and.callThrough()
      componentMount.instance().addCard()
      expect(componentMount.instance().addCard).toHaveBeenCalled()
    })
    it('removes a card', () => {
      spyOn(componentMount.instance(), 'clickClose').and.callThrough()
      componentMount.instance().clickClose()
      expect(componentMount.instance().clickClose).toHaveBeenCalled()
    })

    it('onClick event shows lived in other state multi select', () => {
      let cardComponent = componentMount.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#californiaCriminalBackgroundRadiotrue')
      trueComponent.simulate('change', {target: {value: 'true'}})
      expect(handleClearOnConditionalChangeSpy).toHaveBeenCalledWith('convicted_in_california', 'true', 'convicted_in_california_disclosures', null)
    })

    it('onClick event shows lived in other state multi select', () => {
      let cardComponent = componentMountWithoutDisclosures.find('input[type="radio"]')
      let trueComponent = cardComponent.find('#californiaCriminalBackgroundRadiotrue')
      trueComponent.simulate('change', {target: {value: 'false'}})
      expect(handleClearOnConditionalChangeSpy).toHaveBeenCalledWith('convicted_in_california', 'false', 'convicted_in_california_disclosures', null)
    })
    it('onchange sets disclosures ', () => {
      let cardComponent = componentMountWithoutDisclosures.find('#californiaCriminalBackgroundoffenseReason').hostNodes()
      cardComponent.simulate('change', {target: {value: 'testing'}})
      expect(setParentStateSpy).toHaveBeenCalledWith('convicted_in_california_disclosures', [ Object({ offense: 'testing', offense_city: '', offense_state: Object({ value: 'California', id: 'CA' }), offense_date: '', when_offense_happen: '', offense_details: '' }) ])
    })
    it('check required fields indicator', () => {
      let componentHtml = componentMountWithoutDisclosures.html()
      expect(componentHtml).toContain('What was the offense? (required)')
      expect(componentHtml).toContain('Where did the offense happen? (City, State, Country or other location information) (required)')
      expect(componentHtml).toContain('When did the offense happen? (required)')
      expect(componentHtml).toContain('Explain what happened. (required)')
    })
  })
})
