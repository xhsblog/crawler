require 'open-uri'
class Crawler::JyeoosController < Crawler::BaseController

  def index
    url = 'http://gzsx.cooco.net.cn/testpage/1/'
    uri = URI.parse(url)
    info = ::Cooco::CrawlerInfo.new()
    # is = info.ids_for(2)
    # is = CoocoTask.ids()
    # puts "id is #{is}"
    # render html: html.to_html.html_safe
  end
end
