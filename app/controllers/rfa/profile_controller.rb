# frozen_string_literal: true
class Rfa::ProfileController < CalsBaseController 
  before_action -> { require_rfa_privilege(method(:edit)) }, only: [:edit]

  def index
    @user = user_from_session
    @rfa_application = rfa_application_helper.find_by_application_id(params[:a01_id])
    @contacts = contact_helper.find_items_by_application_id(params[:a01_id])
  end

  def contact_helper
    Helpers::Rfa::ContactHelper.new(auth_header: get_session_token)
  end

  def rfa_application_helper
    Helpers::Rfa::ApplicationHelper.new(auth_header: get_session_token)
  end
end