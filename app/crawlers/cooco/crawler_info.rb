module Crawlers
  module Cooco
    class CrawlerInfo
      def initialize(website = 'http://gzsx.cooco.net.cn')
        @website = website
      end

      def method_name
        
      end

      def ids_f(page)
        remote = Remote.new("http://gzsx.cooco.net.cn/testpage/#{page}")
        page = remote.get()
        html = Nokogiri::HTML::DocumentFragment.parse(page)
        divs = html.search('div.daan')
        ids = divs.map(&->(div){div['id'].split('-').last})
      end
    end
  end
end