class DownloadJob < ApplicationJob
  queue_as :default

  def perform(from = 1, to = 100)
    arr = (from .. to).to_a
    while arr.present? do
      numbers = arr.slice!(0, 5)
      CoocoTask.new(numbers).download
    end
  end
end
