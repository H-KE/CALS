class FacilitiesController < CalsBaseController
  before_action -> { require_search_privilege(method(:show)) }, only: [:show]
  include Response

  def show; end

  def profile
    @facility = facility_helper.find_by_id(params[:facility_id])
    json_response @facility
  rescue ApiError => e
    render json: e.response, status: e.status
  end

  def search
    page_params = {}
    page_params['size_params'] = params[:size]
    page_params['from_params'] = params[:from]
    page_params['sort_params'] = params[:sort]
    page_params['order_params'] = params[:order]
    post_data = request.body.read

    query_hash = QueryPreprocessor.params_to_query_with_types(JSON.parse(post_data).deep_symbolize_keys)
    logger.info "query_hash: #{query_hash}"
    es_query_json = Elastic::QueryBuilder.facility_search_v1(query_hash, page_params).to_json
    logger.info "es query: #{es_query_json}"
    @facilities = facility_helper.search es_query_json
    @facilities_response = {}
    @facilities_response['facilities'] = @facilities['hits']['hits'].collect { |facility| facility['_source']}
    @facilities_response['total'] = @facilities['hits']['total']
    json_response @facilities_response
  rescue ApiError => e
    render json: e.response, status: e.status
  end

  private

  def facility_helper
    Helpers::Facility.new(auth_header: get_session_token)
  end
  
end
