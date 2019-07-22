class CoocoTask
  # include Crawlers::Cooco
  class << self
    def ids(page = 5)
      # (1..page.to_i).map(&->(i){

      # })
      info = CrawlerInfo.new()
      is = info.ids_for(2)
      is
    end
  end
end