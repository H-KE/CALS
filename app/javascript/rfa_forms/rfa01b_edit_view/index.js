import React from 'react'
import Immutable from 'immutable'
import _ from 'lodash'
import {fetchRequest} from 'helpers/http'
import OutOfStateDisclosureCard from './outOfStateDisclosureCard'
import ApplicantDetailsCard from './applicantDetailsCard'
import DisclosureInstructions from './disclosureInstructions'
import CaliforniaCriminalBackground from './californiaCriminalBackground'
import OutsideCACriminalBackground from './outsideCACriminalBackground'
import CrimeBackgroundAgainstCohabitant from './crimeBackgroundAgainstCohabitant'
import PrivacyStatement from './privacyStatement'
import RfaSideBar from 'rfa_forms/rfa_sidebar/index.js'
import {CountyUseOnlyCard} from 'components/rfa_forms/countyUseOnlyCard.js'
import {getDictionaryId, dictionaryNilSelect, checkArrayObjectPresence} from 'helpers/commonHelper.jsx'
import CardsGroupLayout from 'components/common/cardsGroupLayout.js'
import {addCardAsJS, removeCard, checkForNameValidation, checkFieldsForSubmit, validateStatus} from 'helpers/cardsHelper.jsx'

import Validator from 'helpers/validator'
import PageTemplate from 'components/common/pageTemplate'
import {disclosureDefaults} from 'constants/defaultFields'

export default class Rfa01bEditView extends React.Component {
  constructor (props) {
    super(props)
    this.saveProgress = this.saveProgress.bind(this)
    this.submit = this.submit.bind(this)
    this.fetchToRails = this.fetchToRails.bind(this)
    this.getFocusClassName = this.getFocusClassName.bind(this)
    this.setFocusState = this.setFocusState.bind(this)
    this.setApplicationState = this.setApplicationState.bind(this)
    this.setDisplayState = this.setDisplayState.bind(this)
    this.handleClearOnConditionalChange = this.handleClearOnConditionalChange.bind(this)
    this.validator = new Validator({})
    this.validator.validateFieldSetErrorState = this.validateFieldSetErrorState.bind(this)
    this.handleNavLinkClick = this.handleNavLinkClick.bind(this)
    this.isNavLinkActive = this.isNavLinkActive.bind(this)
    this.getApplicantFullName = this.getApplicantFullName.bind(this)

    let submitEnabled = false
    if (!validateStatus(this.props.rfa_a01_application.status)) {
      if (this.props.rfa_a01_application.metadata !== undefined) {
        submitEnabled = this.props.rfa_a01_application.metadata.submit_enabled
        if (this.props.rfa_b01_application.metadata === undefined) {
          submitEnabled = false
        } else {
          submitEnabled = submitEnabled && this.props.rfa_b01_application.metadata.submit_enabled &&
            this.validateAllRequiredForSubmit(this.props.rfa_b01_application)
        }
      }
    }

    this.state = {
      application: this.props.rfa_b01_application,
      activeNavLinkId: this.props.rfa_b01_application.id,
      rfa_a01_application: this.props.rfa_a01_application,
      rfa_b01_application: this.props.rfa_b01_application,
      disclosureInstructionsDisplay: null,
      privacyStatementDisplay: null,
      focusComponentName: '',
      errors: {},
      metadata: {},
      disableSave: !checkForNameValidation(this.props.rfa_a01_application.applicants),
      disableSubmit: !submitEnabled
    }

    if (!this.props.rfa_b01_application.application_county) {
      const countyValue = (this.props.user && this.props.user.county_code)
      this.state.application.application_county = this.props.countyTypes.find(countyType => countyType.id === parseInt(countyValue))
    }
  }

  componentDidMount () {
    let submitEnabled = false
    if (!validateStatus(this.state.rfa_a01_application.status)) {
      if (this.state.application.metadata === undefined) {
        submitEnabled = this.validateAllRequiredForSubmit(this.state.application)
        this.setState({disableSubmit: !submitEnabled})
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.application !== this.state.application) {
      const disableSubmit = !(!validateStatus(this.props.rfa_a01_application.status) &&
        this.validateAllRequiredForSubmit(this.state.application))
      const DataValidForSave = !checkForNameValidation(this.state.rfa_a01_application.applicants)
      if (prevState.disableSubmit !== disableSubmit) {
        this.setState({disableSubmit: disableSubmit})
      } if (prevState.disableSave !== DataValidForSave) {
        this.setState({disableSave: DataValidForSave})
      }
    }
  }

  validateAllRequiredForSubmit (data) {
    let requiredRules = this.validator.allIsRequiredRules()
    requiredRules = requiredRules.merge(this.validator.allValidationsWithOnlyRule('isRequiredBoolean'))
    requiredRules = requiredRules.merge(this.validator.allValidationsWithOnlyRule('isRequiredIf'))
    return this.validator.validateAllFieldsWithRules(data, requiredRules)
  }

  validateFieldSetErrorState (fieldName, value) {
    const error = this.validator.validateFieldAndGetError(fieldName, value)

    let currentErrors = this.state.errors
    if (error === undefined) {
      _.unset(currentErrors, fieldName)
    } else {
      _.set(currentErrors, fieldName, error)
    }
    this.setState({errors: currentErrors})
  }

  saveProgress () {
    let newApp = Immutable.fromJS(this.state.application).setIn(['metadata', 'submit_enabled'],
      !(!validateStatus(this.state.rfa_a01_application.status) && !this.validateAllRequiredForSubmit(this.state.application)))
    const url = '/rfa/b01/' + this.state.rfa_a01_application.id
    return this.fetchToRails(url, 'PUT', newApp.toJS())
  }

  submit () {
    let newApp = Immutable.fromJS(this.state.application).setIn(['metadata', 'submit_enabled'], false)
    this.setState({application: newApp})
    this.saveProgress().then(() => {
      if (this.state.errors && !this.state.errors.issue_details) {
        const url = '/rfa/a01/' + this.state.rfa_a01_application.id + '/b01/' + this.state.application.id + '/submit'
        this.fetchToRails(url, 'POST', {a01_id: this.state.rfa_a01_application.id, b01_id: this.state.application.id})
      }
    })
  }

  fetchToRails (url, method, body) {
    return fetchRequest(url, method, body)
      .then((response) => {
        return response.json()
      }).then((data) => {
        if (!data.issue_details) {
          this.setState({
            application: data,
            errors: {}
          })
        } else {
          this.setState({
            errors: data
          })
        }
      }).catch((errors) => {
        this.setState({
          errors: errors
        })
      })
  }

  setFocusState (focusComponentName) {
    this.setState({focusComponentName: focusComponentName})
  }

  getFocusClassName (componentName) {
    return this.state.focusComponentName === componentName ? 'edit' : 'show'
  }

  setApplicationState (key, value) {
    let newStateApplication = Immutable.fromJS(this.state.application).set(key, value)
    this.setState({
      application: newStateApplication.toJS()
    })
  }

  setDisplayState (key, value) {
    let newState = Immutable.fromJS(this.state)
    newState = newState.set(key, value)
    this.setState(newState.toJS())
  }

  handleClearOnConditionalChange (key, value, hiddenKey, hiddenDefaultValue) {
    let newState = Immutable.fromJS(this.state)
    if (value === 'false') {
      newState = newState.setIn(['application', key], value)
      newState = newState.setIn(['application', hiddenKey], hiddenDefaultValue)
      this.setState(newState.toJS())
    } else if ((value === true || value === 'true') &&
      ((newState.getIn([ 'application', key ]) === undefined) ||
      (newState.getIn([ 'application', key ]) === false))) {
      newState = newState.setIn(['application', key], value)
      this.setState(newState.toJS())
      this.setState({disableSubmit: true})
    } else {
      this.setApplicationState(key, value)
    }
  }

  handleNavLinkClick (id) {
    if (id) {
      this.setState({ activeNavLinkId: id })
    }
  }

  isNavLinkActive (id) {
    return this.state.activeNavLinkId === id
  }

  getApplicantFullName (applicants) {
    return applicants ? applicants.applicant_first_name + ' ' + applicants.applicant_last_name : undefined
  }

  render () {
    const countyValue = getDictionaryId(this.state.application.application_county) || (this.props.user && this.props.user.county_code)

    return (
      <PageTemplate
        headerLabel='Resource Family Application - Confidential (RFA 01B)'
        saveProgressId='saveProgress'
        pageSubHeader={this.getApplicantFullName(this.state.rfa_b01_application)}
        onSaveProgressClick={this.saveProgress}
        disableSave={this.state.disableSave}
        submitId={'submitApplication' + this.state.rfa_a01_application.id}
        disableSubmit={this.state.disableSubmit}
        onSubmitClick={this.submit}
        rfa01aApplicationId={this.state.rfa_a01_application.id}
        rfa01cForms={this.state.rfa_a01_application.rfa1c_forms}
        applicants={this.state.rfa_a01_application.applicants}
        otherAdults={this.state.rfa_a01_application.other_adults}
        childIdentified={this.state.rfa_a01_application.child_desired &&
              this.state.rfa_a01_application.child_desired.child_identified}
        isNavLinkActive={this.isNavLinkActive}
        handleNavLinkClick={this.handleNavLinkClick}

        errors={this.state.errors.issue_details} >

        <CardsGroupLayout>
          <CountyUseOnlyCard
            countyUseOnlyCardId='county_use_only'
            setFocusState={this.setFocusState}
            getFocusClassName={this.getFocusClassName}
            county={countyValue}
            CountyList={this.props.countyTypes}
            onFieldChange={(event) => this.setApplicationState('application_county',
              dictionaryNilSelect(event.target.options))} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <h2>I.<span>Out of State Disclosure</span></h2>
          <OutOfStateDisclosureCard
            validator={this.validator}
            livedInOtherState={this.state.application.lived_in_other_state}
            otherStatesOfLiving={this.state.application.other_states_of_living}
            stateTypes={this.props.stateTypes}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>
        <CardsGroupLayout>
          <h2>II.<span>Criminal Record Statement</span></h2>
          <DisclosureInstructions
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            disclosureInstructionsDisplay={this.state.disclosureInstructionsDisplay}
            setDisplayState={this.setDisplayState}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <CaliforniaCriminalBackground
            convictedInCalifornia={this.state.application.convicted_in_california}
            disclosures={checkArrayObjectPresence(this.state.application.convicted_in_california_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState}
            validator={this.validator} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <OutsideCACriminalBackground
            convictedInAnotherState={this.state.application.convicted_in_another_state}
            disclosures={checkArrayObjectPresence(this.state.application.convicted_in_another_state_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState}
            validator={this.validator} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <CrimeBackgroundAgainstCohabitant
            arrestedForCrime={this.state.application.arrested_for_crime}
            disclosures={checkArrayObjectPresence(this.state.application.arrested_for_crime_disclosures) || [disclosureDefaults]}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            handleClearOnConditionalChange={this.handleClearOnConditionalChange}
            setParentState={this.setApplicationState}
            validator={this.validator} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <PrivacyStatement
            privacyStatementDisplay={this.state.privacyStatementDisplay}
            setDisplayState={this.setDisplayState}
            focusComponentName={this.state.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState} />
        </CardsGroupLayout>

        <CardsGroupLayout>
          <h2><span>Applicant or Other Adult </span></h2>
          <ApplicantDetailsCard
            application={this.state.application}
            resourceFamily={this.state.application.resource_family_name}
            validator={this.validator}
            focusComponentName={this.focusComponentName}
            getFocusClassName={this.getFocusClassName}
            setFocusState={this.setFocusState}
            setParentState={this.setApplicationState}
            stateTypes={this.props.stateTypes}
            namePrefixTypes={this.props.namePrefixTypes}
            nameSuffixTypes={this.props.nameSuffixTypes} />
        </CardsGroupLayout>
      </PageTemplate>
    )
  }
}
