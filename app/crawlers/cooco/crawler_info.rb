module Cooco
  class CrawlerInfo
    def initialize(website = 'http://gzsx.cooco.net.cn')
      @website = website
      @remote = Remote.new()
    end

    # ids for page numbers, numbers is array
    def ids_for(numbers)
      ids = []
      numbers.map(&->(i){
        url = "http://gzsx.cooco.net.cn/testpage/#{i}/"
        page = @remote.conn.get(url).body
        html = Nokogiri::HTML::DocumentFragment.parse(page)
        divs = html.search('div.daan')
        per_ids = divs.map(&->(div){div['id'].split('-').last})
        ids.concat(per_ids)
      })
      ids
    end
  end
end