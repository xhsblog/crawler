require 'open-uri'

class Crawler::JyeoosController < Crawler::BaseController
  def index
    # url = 'http://www.jyeoo.com/math2/ques/partialques?f=1&q=A~~&lbs=&so=1&pd=1&pi=3&r=0.7528943867196467'
    url = 'http://gzsx.cooco.net.cn/testpage/1/'
    uri = URI.parse(url)
    # param = {
    #   f: 1,
    #   q: 'A~~',
    #   lbs: '',
    #   so: 1,
    #   pd: 1,
    #   pi: 2,
    #   r: 0.7528943867196467
    # }
    # uri.query = URI.encode_www_form(param)
    # res = Net::HTTP.get_response(uri)
    
    # http = Net::HTTP.new(uri.host, uri.port)
    # request = Net::HTTP::Get.new(uri.request_uri)
    # request['Cookie'] = 'remind_check=1; jyean=M8hXOxsveBp9RPE9My_hsH73o0brF6XVewgJw5hE6pC76roQLlS3-aEO7L4-L9mFLMKCSzwncj2y366tS9YEgtKIZ59xWwguedEEFVenj81d_pDpVSj_sDPFcdE-RA7_0; LF_Email=youedu@xyh.com; jy=50EB9E4336188B76D695E538EF8413AC0E3DC52FA7F91CAAF2EB742BA358F1F7248679689E5E5E23B4E6ECDE25889C065DC7AA9D7714BC6EB48CB85FC358CBFBD290E766C4118518DE9701FC46CD98A32789521DDD624D4896D95A80202F46489932CD96A8A72A5D59576B8F3B92CE737FACB37413EFFC52BC33B6487D5D125750E8089521D32EEE79FFA8A6CE9B808BC0ECD6489675ED8E8D10681484DDAD2CA412B643D8D26D0408CAF4A2FBDBD38C08A21D46675212850AD17C1076FD0375620139A793B26CE4EADA2184B8EBFCD250D7FEDC1F3990A30068786ADAE32FEF691F0C5E04A66FBD89516F8633A4F0797CA7A3D5387D8182D3B3AFA189126C21BC71B07D62FBAAFAF0666C314139D407AB915A3F1804F58B34EA4A6916FB85D8AD94C4D9552C600BDA6F202D64682715B30FD834D759F21B2F620D44C932AF0EC9A1804685012194D9DF590B9B49FCAC3D5689CA2A3682F6DF2907E5EBE0EA39DAD7102B7FA879C41FD5F7F058977A39; jye_cur_sub=math2; jy_user_lbs_math2=; UM_distinctid=16bfdc7b602363-0d2104b9426b11-37667e02-1aeaa0-16bfdc7b603b47; CNZZDATA2018550=cnzz_eid%3D1015546964-1563327918-http%253A%252F%252Fwww.jyeoo.com%252F%26ntime%3D1563354920'
    # response = http.request(request)
    # cookies = response.response['set-cookie']


    # cookies = res.get_fields('set-cookie')
    # puts "cookies ius #{cookies}"
    # res.response['set-cookie']#.split(';')
    # if !res.is_a?(Net::HTTPSuccess)
    #   render text: "获取内容失败 => #{uri}" 
    # end

    # puts "res response cookie #{res.response['set-cookie'].split(';')} "

    # html = Nokogiri::HTML(open(url))
    # questions = html.search('fieldset.quesborder')
    # # binding.pry
    # questions.each_with_index do |question|
    #   id = question.to_h['id']
    #   # puts "question shi #{question['id']}, id 是 #{id}"
    # end
    # puts "question shi #{questions.last.to_json}, id 是 #{'id'}"
    # puts "Nokogiri::HTML(open(url)), #{Nokogiri::HTML(open(url))}"
    # r = Net::HTTP.get(URI.parse('http://www.example.com/about.html'))
    # puts "r is #{html.search('ul.ques-list')}"
    # website = RemoteUrls.brand_uri
    # CrawlerRunner.new(self.new(website), ::MechanizeAgent.new ).crawl if website.present?
    # Crawlers::Jyeoo::QuestionCrawler.crawl(website)
    # render html: res.body

    remote = Remote.new(url)
    page = remote.get()
    
    # html = Nokogiri::HTML(page)
    # imgs = html.search('img')
    # imgs.each do |img|
    #   img = img.to_h
    #   img['src'] = "#{uri.host}#{img['src']}"
    # end

    html = Nokogiri::HTML::DocumentFragment.parse(page)
    imgs = html.at_css "img"
    # binding.pry

    # @doc = Nokogiri::HTML::DocumentFragment.parse <<-EOHTML
    #   <body>
    #     <h2 class="h2-1">Three's Company</h2>
    #     <h2 class="h2-2">hi, h2</h2>
    #     <div>A love triangle.</div>
    #   </body>
    # EOHTML

    imgs = html.search("img")
    imgs.each(&->(i){i['src']= uri.scheme + '://' + uri.host + i['src']})
    
    render html: html.to_html.html_safe
    # render html: imgs.to_html.html_safe
    
    # puts "这里是#{res}"
    # render html: page.html_safe
    # respond_to do |format|
    #   format.html { render :text => res.body }
    # end
  end
end
