import './RentalTerms.css'

const RentalTerms = () => {
  return (
    <div id="accordion" >
    <div className="card">
      <div className="card-header" id="headingOne">
        <h5 className="mb-0">
          <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Çerez Politikası
          </button>
        </h5>
      </div>
  
      <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
        <div className="card-body">
        <p>ExtendRent, web sitesi kullanıcılarına daha iyi bir deneyim sunabilmek için çerezleri kullanmaktadır. Çerezler, web sitesinin doğru bir şekilde çalışmasını sağlamak, kullanıcı oturumlarını yönetmek, siteyi güvenli hale getirmek ve kullanıcı tercihlerini hatırlamak için kullanılır.

        Hangi Çerezler Kullanılıyor?
        Zorunlu Çerezler: Bu çerezler, web sitesinin temel işlevselliği için gereklidir. Kullanıcıların hesaplarına giriş yapabilmeleri ve diğer temel işlevleri gerçekleştirebilmeleri için kullanılırlar.

        Performans Çerezleri: Bu çerezler, web sitesinin performansını ölçmek ve iyileştirmek için kullanılır. Hangi sayfaların en çok ziyaret edildiğini anlamak ve siteye gelen trafiği izlemek için kullanılırlar.

        Reklam Çerezleri: Bu çerezler, kullanıcıların ilgi alanlarına göre reklamları kişiselleştirmek için kullanılır. Bu çerezler, kullanıcıların daha önce ziyaret ettikleri sayfalara dayalı olarak ilgili reklamları görüntülemelerini sağlar.

        Çerezleri Nasıl Kontrol Edebilirim?
        Kullanıcılar, tarayıcı ayarlarını değiştirerek çerez kullanımını kontrol edebilirler. Tarayıcı ayarlarınızı değiştirerek çerezleri engelleyebilir veya istediğiniz zaman silme seçeneğine sahip olabilirsiniz. Ancak, bazı çerezlerin devre dışı bırakılması, web sitesinin bazı özelliklerinin düzgün çalışmamasına neden olabilir.
        </p></div>
      </div>
    </div>
    <div className="card">
      <div className="card-header" id="headingTwo">
        <h5 className="mb-0">
          <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
            Kiralama Koşulları
          </button>
        </h5>
      </div>
      <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
        <div className="card-body">
        Hoş geldiniz! ExtendRent, kullanıcılarına araç kiralama hizmetleri sunan bir platformdur. Lütfen aşağıdaki kullanım koşullarını dikkatlice okuyun. ExtendRent'i kullanarak, aşağıdaki koşulları kabul etmiş olursunuz.

        Hesap Oluşturma ve Güvenlik:

        ExtendRent'i kullanmak için bir hesap oluşturmalısınız.
        Hesap bilgilerinizin güvenliğinden siz sorumlusunuz. Şifrenizi güvenli tutun ve başkalarıyla paylaşmayın.
        ExtendRent, hesabınızın yetkisiz kullanımı nedeniyle oluşabilecek kayıplardan sorumlu değildir.

        Rezervasyonlar:

        Araç rezervasyonları, belirtilen kurallar ve ücretlendirme politikaları çerçevesinde yapılmalıdır.
        Rezervasyonlar, kullanıcılar arasında önceden belirlenmiş politikalar doğrultusunda değiştirilebilir veya iptal edilebilir.

        Araç Kiralama:


        Araç kiralama sürecinde, aracın durumu ve belgelerle ilgili doğru ve güncel bilgileri sağlamak kullanıcının sorumluluğundadır.
        Kullanıcılar, araçları kiralarken tüm yerel trafik ve park kurallarına uymakla yükümlüdür.

        Ücretlendirme ve Ödemeler:

        Kiralama ücretleri, rezervasyon sırasında belirtilen ücretlendirme politikalarına göre belirlenir.
        Ödemeler, ExtendRent üzerinden güvenli bir şekilde gerçekleştirilmelidir.

        İptal ve İade Politikası:


        Rezervasyon iptal ve iade politikaları, rezervasyon sırasında belirtilen koşullara göre uygulanır.

        İhlal ve Sorumluluklar:

        ExtendRent'i kötüye kullanmak, diğer kullanıcıların hakkına zarar vermek veya platforma zarar vermek yasaktır.
        Kullanıcılar, ExtendRent'i yasalara uygun bir şekilde kullanmakla yükümlüdür.

        Gizlilik Politikası:


        Kullanıcıların kişisel bilgileri ExtendRent Gizlilik Politikası'na tabidir.

        Değişiklikler ve Güncellemeler:


        ExtendRent, kullanım koşullarını güncelleme hakkını saklı tutar. Güncellemeler, kullanıcılara bildirilecektir.

        ExtendRent'i kullanarak bu kullanım koşullarını kabul etmiş sayılırsınız. Lütfen düzenli olarak bu koşulları kontrol edin, 
        çünkü değişiklikler kullanıcılara bildirildikten sonra da yürürlüğe girecektir. Teşekkür ederiz ve güvenli sürüşler dileriz!
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-header" id="headingThree">
        <h5 className="mb-0">
          <button className="btn btn-link collapsed" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Kişisel Verilerin Korunması ve İşlenmesine İlişkin Aydınlatma Metni
          </button>
        </h5>
      </div>
      <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
        <div className="card-body">

        Sayın Müşterimiz,

        Rent a Car hizmetlerimizi kullanarak bize kişisel verilerinizi sağladığınız için teşekkür ederiz. Müşteri gizliliği ve veri güvenliği, bizim için en üst düzeyde önem taşımaktadır. Bu nedenle, kişisel verilerinizi koruma ve işleme politikalarımızı sizinle paylaşmak istiyoruz.

        Kişisel Veri Toplama

        Rent a Car hizmetlerimizi kullanırken, aşağıdaki kişisel verileri toplayabiliriz:

        Adınız ve Soyadınız
        İletişim Bilgileriniz (Telefon numarası, e-posta adresi vb.)
        Kimlik Bilgileri (Kimlik belgesi numarası, sürücü belgesi numarası vb.)
        Kiralama Süresi ve Detayları
        Ödeme Bilgileri
        Kişisel Veri Kullanımı

        Topladığımız kişisel verileri aşağıdaki amaçlar doğrultusunda kullanabiliriz:

        Kiralama işlemlerini gerçekleştirmek ve hizmet sunmak
        Müşteri hizmetlerini sağlamak ve destek vermek
        Hizmetlerimizi iyileştirmek ve geliştirmek
        Yasal gereksinimlere uyum sağlamak
        Kişisel Veri Paylaşımı ve Aktarımı

        Kişisel verilerinizi üçüncü taraflarla paylaşmamız veya aktarmamız gerektiğinde, bunu yalnızca yasal gereksinimler doğrultusunda ve sizin onayınızla yaparız.

        Kişisel Veri Güvenliği

        Kişisel verilerinizi korumak için uygun güvenlik önlemlerini alırız ve veri güvenliği konusunda endüstri standartlarını takip ederiz.

        Kişisel Veri Saklama

        Kişisel verilerinizi sadece gerekli olduğu sürece saklarız ve yasal saklama süreleri dışında verilerinizi sileriz veya anonimleştiririz.

        Haklarınız

        Kişisel verilerinizle ilgili olarak sahip olduğunuz haklarınızı kullanma hakkına sahipsiniz. Bu haklarınız arasında veriye erişim, düzeltme, silme ve işleme itiraz etme gibi haklar bulunmaktadır.

        İletişim

        Kişisel verilerinizle ilgili herhangi bir sorunuz veya endişeniz varsa, lütfen bizimle iletişime geçmekten çekinmeyin. İletişim bilgilerimiz web sitemizde bulunmaktadır.

        Saygılarımızla,
        [ExtendRent]
        </div>
      </div>
    </div>
  </div>
  )
  }; 
 
export default RentalTerms;
