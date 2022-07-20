import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import { AdminGuard } from './core/auth/guards/admin.guard';
export const appRoutes: Route[] = [

    { path: '', pathMatch: 'full', redirectTo: 'wellcome/gioithieu' },
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'wellcome/gioithieu' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule) },
            { path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule) },
            { path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule) },
            { path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule) },
            { path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule) }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule) },
            { path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule) }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule) },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            // Wellcome
            {
                path: 'wellcome',
                children: [
                    { path: 'gioithieu', loadChildren: () => import('app/modules/admin/wellcome/giothieu/gioithieu.module').then(m => m.GioithieuModule) },
                    { path: 'cauhoi', loadChildren: () => import('app/modules/admin/wellcome/cauhoi/cauhoi.module').then(m => m.CauhoiModule) },
                    { path: 'cauhoithuonggap', loadChildren: () => import('app/modules/admin/wellcome/cauhoithuonggap/cauhoithuonggap.module').then(m => m.CauhoithuonggapModule) },

                ]
            },
            {
                path: 'thongtin',    
                    children: [
                        { path: 'hoso', loadChildren: () => import('app/modules/admin/thongtincoban/hoso/hoso.module').then(m => m.HosoModule) },
                        { path: 'quanlycongviec', loadChildren: () => import('app/modules/admin/thongtincoban/quanlycongviec/quanlycongviec.module').then(m => m.QuanlycongviecModule) },
                        { path: 'congviec', loadChildren: () => import('app/modules/admin/thongtincoban/congviec/congviec.module').then(m => m.CongviecModule) },
                        { path: 'trello', loadChildren: () => import('app/modules/admin/thongtincoban/trello/trello.module').then(m => m.TrelloModule) },
                        { path: 'lichhop', loadChildren: () => import('app/modules/admin/thongtincoban/lichhop/lichhop.module').then(m => m.LichhopModule) },

                    ]
            },
            {
                path: 'tuyendung',
                //canActivate: [AdminGuard],
                children: [
                    { path: 'dashboard', loadChildren: () => import('app/modules/admin/tuyendung/dashboardtuyendung/dashboardtuyendung.module').then(m => m.DashboardtuyendungModule) },
                    { path: 'vetuyendung', loadChildren: () => import('app/modules/admin/tuyendung/vetuyendung/vetuyendung.module').then(m => m.VetuyendungModule) },
                    { path: 'hosotuyendung', loadChildren: () => import('app/modules/admin/tuyendung/hosotuyendung/hosotuyendung.module').then(m => m.HosotuyendungModule) },
                    { path: 'formtuyendung', loadChildren: () => import('app/modules/admin/tuyendung/formtuyendung/formtuyendung.module').then(m => m.FormtuyendungModule) },

                ]
            },
            {
                 path: 'daotao', loadChildren: () => import('app/modules/admin/daotao/daotao.module').then(m => m.DaotaoModule) 
            },
            {
                path: 'cauhinh',
                //canActivate: [AdminGuard],
                loadChildren: () => import('app/modules/admin/cauhinh/cauhinh.module').then(m => m.CauhinhModule)
            },
            {
                path: 'custom',
                //canActivate: [AdminGuard],
                children: [
                    { path: 'testing', loadChildren: () => import('app/modules/admin/custom/testing/testing.module').then(m => m.TestingModule) },
                    { path: 'khachhangs', loadChildren: () => import('app/modules/admin/custom/khachhangs/khachhangs.module').then(m => m.KhachhangsModule) },
                ]
            },
            {
                path: 'baocao',
                //canActivate: [AdminGuard],
                children: [
                    { path: 'nhanvien', loadChildren: () => import('app/modules/admin/baocao/nhanvien/nhanvien.module').then(m => m.NhanvienModule) },
                    { path: 'quanlynhanvien', loadChildren: () => import('app/modules/admin/baocao/quanlynhanvien/quanlynhanvien.module').then(m => m.QuanlynhanvienModule) },
                ]
            },
            {
                path: 'quanlyads', loadChildren: () => import('app/modules/admin/quanlyads/quanlyads.module').then(m => m.QuanlyadsModule) 
            },
            // Dashboards
            {
                path: 'dashboards',
                //canActivate: [AdminGuard],
                children: [
                    { path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule) },
                    { path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.module').then(m => m.AnalyticsModule) },
                    { path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.module').then(m => m.FinanceModule) },
                    { path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.module').then(m => m.CryptoModule) },
                ]
            },

            // Apps
            {
                path: 'apps',
                children: [
                    { path: 'academy', loadChildren: () => import('app/modules/admin/apps/academy/academy.module').then(m => m.AcademyModule) },
                    { path: 'chat', loadChildren: () => import('app/modules/admin/apps/chat/chat.module').then(m => m.ChatModule) },
                    { path: 'contacts', loadChildren: () => import('app/modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule) },
                    { path: 'ecommerce', loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule) },
                    { path: 'file-manager', loadChildren: () => import('app/modules/admin/apps/file-manager/file-manager.module').then(m => m.FileManagerModule) },
                    { path: 'help-center', loadChildren: () => import('app/modules/admin/apps/help-center/help-center.module').then(m => m.HelpCenterModule) },
                    { path: 'mailbox', loadChildren: () => import('app/modules/admin/apps/mailbox/mailbox.module').then(m => m.MailboxModule) },
                    { path: 'notes', loadChildren: () => import('app/modules/admin/apps/notes/notes.module').then(m => m.NotesModule) },
                    { path: 'scrumboard', loadChildren: () => import('app/modules/admin/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule) },
                    { path: 'tasks', loadChildren: () => import('app/modules/admin/apps/tasks/tasks.module').then(m => m.TasksModule) },
                ]
            },

            // Pages
            {
                path: 'pages',
                children: [

                    // Activities
                    { path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule) },

                    // Authentication
                    { path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule) },

                    // Coming Soon
                    { path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule) },

                    // Error
                    {
                        path: 'error', children: [
                            { path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
                            { path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module) }
                        ]
                    },

                    // Invoice
                    {
                        path: 'invoice', children: [
                            {
                                path: 'printable', children: [
                                    { path: 'compact', loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule) },
                                    { path: 'modern', loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule) }
                                ]
                            }
                        ]
                    },

                    // Maintenance
                    { path: 'maintenance', loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) },

                    // Pricing
                    {
                        path: 'pricing', children: [
                            { path: 'modern', loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule) },
                            { path: 'simple', loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule) },
                            { path: 'single', loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule) },
                            { path: 'table', loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule) }
                        ]
                    },

                    // Profile
                    { path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule) },

                    // Settings
                    { path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule) },
                ]
            },

            // User Interface
            {
                path: 'ui', children: [

                    // Material Components
                    { path: 'material-components', loadChildren: () => import('app/modules/admin/ui/material-components/material-components.module').then(m => m.MaterialComponentsModule) },

                    // Fuse Components
                    { path: 'fuse-components', loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.module').then(m => m.FuseComponentsModule) },

                    // Other Components
                    { path: 'other-components', loadChildren: () => import('app/modules/admin/ui/other-components/other-components.module').then(m => m.OtherComponentsModule) },

                    // TailwindCSS
                    { path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule) },

                    // Advanced Search
                    { path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule) },

                    // Animations
                    { path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule) },

                    // Cards
                    { path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule) },

                    // Colors
                    { path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule) },

                    // Confirmation Dialog
                    { path: 'confirmation-dialog', loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.module').then(m => m.ConfirmationDialogModule) },

                    // Datatable
                    { path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule) },

                    // Forms
                    {
                        path: 'forms', children: [
                            { path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule) },
                            { path: 'layouts', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule) },
                            { path: 'wizards', loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule) }
                        ]
                    },

                    // Icons
                    { path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule) },

                    // Page Layouts
                    { path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule) },

                    // Typography
                    { path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule) }
                ]
            },

            // Documentation
            {
                path: 'docs', children: [

                    // Changelog
                    { path: 'changelog', loadChildren: () => import('app/modules/admin/docs/changelog/changelog.module').then(m => m.ChangelogModule) },

                    // Guides
                    { path: 'guides', loadChildren: () => import('app/modules/admin/docs/guides/guides.module').then(m => m.GuidesModule) }
                ]
            },

            // 404 & Catch all
            { path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module) },
            { path: '**', redirectTo: '404-not-found' }
        ]
    }
];
