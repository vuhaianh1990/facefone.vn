<!-- Left Sidebar -->
<aside id="leftsidebar" class="sidebar">
  <!-- User Info -->

  <!-- #User Info -->
  <!-- Menu -->
  <div class="menu">
    <ul class="list">
      <li>
        <a class="logout" href="{{ route('logout') }}">Đăng xuất</a>
      </li>
      <li class="header">Menu</li>
      <li>
        <a href="{{ admin_route('home') }}">
          <i class="material-icons">home</i>
          <span>TỔNG QUAN</span>
        </a>
      </li>
      <li>
        <a href="{{ admin_route('listScan') }}">
          <i class="material-icons">chrome_reader_mode</i>
          <span>DANH SÁCH TRA CỨU</span>
        </a>
      </li>

      @hasanyrole('admin|superadmin|group_admin|company_admin')
      <li>
        <a href="javascript:void(0);" class="menu-toggle waves-effect waves-block toggled">
          <i class="material-icons">view_list</i>
          <span>QUẢN LÝ THÀNH VIÊN</span>
        </a>
        <ul class="ml-menu" style="display: block;">
          @hasanyrole('admin|superadmin|group_admin|company_admin')
            <li>
              <a href="{{ admin_route('group_member') }}" class="waves-effect waves-block">THÀNH VIÊN</a>
            </li>
          @endhasanyrole
          @hasanyrole('admin|superadmin|company_admin')
          <li>
            <a href="{{ admin_route('team_member') }}" class="waves-effect waves-block">NHÓM</a>
          </li>
          @endhasanyrole
        </ul>
      </li>
      @endhasanyrole

      @hasanyrole('superadmin')
      <li>
        <a href="{{ superadmin_route('list-transaction') }}">
          <i class="material-icons">money</i>
          <span>QUẢN LÝ ĐƠN HÀNG</span>
        </a>
      </li>
      <li>
        <a href="{{ superadmin_route('active') }}">
          <i class="material-icons">money</i>
          <span>QUẢN LÝ VÀ KÍCH HOẠT USER</span>
        </a>
      </li>
      @endhasanyrole
      <li>
        <a href="{{ admin_route('management_affilate') }}">
          <i class="material-icons">money</i>
          <span>KIẾM TIỀN AFFILIATE</span>
        </a>
      </li>
      {{-- <li>
        <a href="{{ admin_route('howtouse') }}">
          <i class="material-icons">assignment_turned_in</i>
          <span>HƯỚNG DẪN SỬ DỤNG</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);" class="menu-toggle">
          <i class="material-icons">content_copy</i>
          <span>Blank</span>
        </a>
        <ul class="ml-menu">
          <li>
            <a href="#">DANH SÁCH</a>
          </li>
        </ul>
      </li> --}}
      <li>
        <a href="javascript:void(0);" class="menu-toggle waves-effect waves-block toggled">
          <i class="material-icons">view_list</i>
          <span>THANH TOÁN</span>
        </a>
        <ul class="ml-menu" style="display: block;">
          <li>
            <a href="{{ admin_route('payment') }}" class=" waves-effect waves-block">GÓI DỊCH VỤ</a>
          </li>
          <li>
            <a href="{{ admin_route('transaction') }}" class="waves-effect waves-block">LỊCH SỬ GIAO DỊCH</a>
          </li>
        </ul>
      </li>
      <li class="header">Liên Hệ</li>
      <li class="bg-cyan">
        <a href="tel:0986863920">
          <i class="material-icons col-white">contact_phone</i>
          <span class="col-white">0986.863.920 (Tư vấn)</span>
        </a>
      </li>
      <li class="bg-light-blue">
        <a href="tel:0986863920">
          <i class="material-icons col-white">contact_phone</i>
          <span class="col-white">0986.863.920 (Zalo)</span>
        </a>
      </li>
      <li class="bg-blue">
        <a href="tel:0986863920">
          <i class="material-icons col-white">contact_phone</i>
          <span class="col-white">0986.863.920 (Viber)</span>
        </a>
      </li>
      {{-- <li class="header">MỨC ĐỘ QUAN TRỌNG</li>
      <li>
        <a href="javascript:void(0);">
          <i class="material-icons col-red">donut_large</i>
          <span>Quan trọng</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <i class="material-icons col-amber">donut_large</i>
          <span>Cảnh báo</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <i class="material-icons col-cyan">donut_large</i>
          <span>Thông tin</span>
        </a>
      </li>
      <li>
        <a href="javascript:void(0);">
          <i class="material-icons col-light-green">donut_large</i>
          <span>Thành công</span>
        </a>
      </li> --}}
    </ul>
  </div>
  <!-- #Menu -->
  <!-- Footer -->
  <div class="legal">
    <div class="copyright">
      &copy; 2018 <a href="javascript:void(0);">Copyright&copy; by Facefone</a>.
    </div>
    <div class="version">
      <b>Version: </b> 1.0
    </div>
  </div>
  <!-- #Footer -->
</aside>
<!-- #END# Left Sidebar -->