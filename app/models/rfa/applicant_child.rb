class Rfa::ApplicantChild < CalsBase
  include Concerns::Rfa::ApplicationMinorChildrenApiProtocolProvider

  attr_accessor :id, :relationship_type, :date_of_birth, :gender, :child_financially_supported,
   :in_house, :child_adopted, :minor, :legal_first, :legal_middle, :legal_last, :relationship_to_applicant, :relationship_to_applicants

  def self.parent_path
    'rfa-1a-forms'
  end

  def self.api_resource_path
    'minor-children'
  end
end